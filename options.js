const Regex = require('@companion-module/base')

module.exports = {
	CueType: {
		id: 'cueType',
		type: 'dropdown',
		label: 'Cue Type',
		default: 'next',
		choices: [
			{ id: 'next', label: 'Next' },
			{ id: 'back', label: 'Back' },
			{ id: 'black', label: 'Blackout' },
		],
	},

	Channel: {
		id: 'channel',
		type: 'multidropdown',
		label: 'CueEther Channels',
		default: ['1', '2', '3', '4'],
		choices: [
			{ id: '1', label: '1' },
			{ id: '2', label: '2' },
			{ id: '3', label: '3' },
			{ id: '4', label: '4' },
		],
	},

	Protocol: {
		id: 'protocol',
		type: 'dropdown',
		label: 'Connect with TCP / UDP',
		default: 'udp',
		width: 4,
		choices: [
			{ id: 'tcp', label: 'TCP' },
			{ id: 'udp', label: 'UDP' },
		],
	},

	Port: {
		id: 'port',
		type: 'textinput',
		label: 'Target Port (default: 36710)',
		default: 36710,
		width: 5,
		regex: Regex.PORT,
	},

	TargetIP: {
		id: 'targetIP',
		type: 'textinput',
		label: 'CueEther Fixed IP',
		default: "123.456.78.9",
		width: 12,
		regex: Regex.IP,
		isVisible: (configValues) => configValues.protocol === 'tcp',
	},

	BroadcastIP: {
		id: 'broadcastIP',
		type: 'textinput',
		label: 'Broadcast Address (default: 255.255.255.255)',
		default: "255.255.255.255",
		width: 12,
		regex: Regex.IP,
		isVisible: (configValues) => configValues.protocol === 'udp',
	}
};