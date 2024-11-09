const { InstanceBase, runEntrypoint, InstanceStatus, TCPHelper, UDPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdatePresets = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const ConfigFields = require('./config')
// ASCII:             		  4F                   50                    05
const cueTypes = { next:[ 0x34, 0x46 ], back:[ 0x35, 0x30 ], black:[ 0x30, 0x35 ] };
const channelByte = [ 0x35, 0x33, 0x34, 0x32 ];

class ModuleInstance extends InstanceBase {

	constructor(internal) {
		super(internal);
	}

	async init(config) {
		this.config = config;

		this.updateActions();
		this.updateFeedbacks();
		this.updateVariableDefinitions();
		this.updatePresets();
		
		await this.configUpdated(config)
		
		this.updateStatus(InstanceStatus.Ok); // Updates Dashboard Connection Status
	}
	// When module gets deleted
	async destroy() {
		if (this.socket) {
			this.socket.destroy()
		} else if (this.udp) {
			this.udp.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
		this.log('Destroy');
	}

	async configUpdated(config) {
		this.log('Config updated');
		if (this.udp) {
			this.udp.destroy();
			delete this.udp;
		}

		if (this.socket) {
			this.socket.destroy();
			delete this.socket;
		}

		this.config = config;

		if (this.config.protocol == 'tcp') {
			this.initTCP();
		}

		if (this.config.protocol == 'udp') {
			this.initUDP();
		}
	}

	// Return config fields for web config
	getConfigFields() {
		return ConfigFields;
	}

	updatePresets() {
		UpdatePresets(this);
	}

	updateActions() {
		UpdateActions(this);
	}

	updateFeedbacks() {
		UpdateFeedbacks(this);
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this);
	}

	filterResponseLog(response) {
		if (response.ok) {
			this.updateStatus(InstanceStatus.Ok); // Updates Dashboard Connection Status
			return;
		}
		if (response.status == 404) {
			this.log('error','GlobalCue Session Not found : Check Session and Presenter ID');
			this.updateStatus(InstanceStatus.BadConfig); // Updates Dashboard Connection Status
		} else if (response.status == 500) {
			this.log('error','Server error');
			this.updateStatus(InstanceStatus.UnknownError); // Updates Dashboard Connection Status
		} else if (response.status == 524) {
			this.log('debug','HTTP Timeout (No update in last 100s)');
		} else if (!response.ok) {
			this.log('error',`HTTP error! status: ${response.status}`);
			this.updateStatus(InstanceStatus.UnknownError); // Updates Dashboard Connection Status
		} else {
			this.log('error',`Error in request: ${response}`);
			this.updateStatus(InstanceStatus.UnknownError); // Updates Dashboard Connection Status
		}
	}

	// See https://nodejs.org/api/errors.html#nodejs-error-codes
	filterErrorLog(error) {
		this.updateStatus(InstanceStatus.UnknownError); // Updates Dashboard Connection Status
		try {
			if (error.cause.code == 'UND_ERR_CONNECT_TIMEOUT' ||
				error.cause.code == 'ENOTFOUND') {
				this.log('error','Connection timeout : Check Connection to GlobalCue');
			} else if (error.cause.code == 'ERR_INVALID_URL') {
				this.log('error','Invalid ID : Check Presenter ID');
			} else if (error.cause.code == 'ECONNABORTED') {
				this.log('error','Connection aborted : Check hardware setup');
			} else {
				this.log('error',error);
			}
		} catch {
			this.log('error',error);
		}
	}

	initUDP() {
		if (this.udp) {
			this.udp.destroy();
			delete this.udp;
		}

		this.updateStatus(InstanceStatus.Connecting);

		if (this.config.broadcastIP) {
			this.udp = new UDPHelper(this.config.broadcastIP, this.config.port, {broadcast: true});
			this.updateStatus(InstanceStatus.Ok);
				
			this.udp.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message);
				this.log('error', 'Network error: ' + err.message);
			});

			this.udp.on('status_change', (status, message) => {
				this.updateStatus(status, message);
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig);
		}
	}

	initTCP() {
		if (this.socket) {
			this.socket.destroy();
			delete this.socket;
		}

		this.updateStatus(InstanceStatus.Connecting);

		if (this.config.host) {
			this.socket = new TCPHelper(this.config.targetIP, this.config.port);

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message);
			});

			this.socket.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message);
				this.log('error', 'Network error: ' + err.message);
			});

			this.socket.on('data', (data) => {
				this.log('info', data.toString());
			});
		} else {
			this.updateStatus(InstanceStatus.BadConfig);
		}
	}

	// Crude packet assembly and sender
	buildSendPacket(cueType, channel) {
		var _packet = Buffer.from([0x2A, 0x55, 0x30, 0x30, 0x34, 0x46, 0x0D]);

		if (cueType == 'next') {
			_packet[4] = cueTypes.next[0];
			_packet[5] = cueTypes.next[1];
		} else if (cueType == 'back') {
			_packet[4] = cueTypes.back[0];
			_packet[5] = cueTypes.back[1];
		} else if (cueType == 'black') {
			_packet[4] = cueTypes.black[0];
			_packet[5] = cueTypes.black[1];
		} else {
			this.log('error', "Cue Type not selected within button");
			return;
		}

		// Packet default is all (channel 5), so anything less is specific
		if (channel <= 4) {
			_packet[0] = channelByte[channel - 1];
		}

		if (this.config.protocol == 'tcp') {
			if (this.socket !== undefined && this.socket.isConnected) {
				this.log('debug', `Sending ${_packet.toString()} to ${this.config.targetIP}`);
				this.socket.send(_packet);
			} else {
				this.log('error', 'Socket not connected');
			}
		}

		if (this.config.protocol == 'udp') {
			if (this.udp !== undefined) {
				this.log('debug', `Sending ${_packet.toString()} to ${this.config.broadcastIP}`);
				this.udp.send(_packet);
			} else {
				this.log('error', 'Socket not connected');
			}
		}
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts);