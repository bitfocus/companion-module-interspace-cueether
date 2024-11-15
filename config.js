const Options = require('./options')

module.exports = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `
				<h3>Interspace Industries CueEther Module</h3>
				<div>
					<p>This Companion module allows you to send Cues directly to a <b>CueEther</b> via TCP or as a UDP broadcast to multiple units.</p>
					<p>By default this module is setup to use UDP. Broadcasting Cues to the default 255.255.255.255 broadcast address</p>
					<h4>CueEther Setup</h4>
					<ol>
						<li>Firstly, access the webpage of the CueEther Receiver to configure the <b>Work Mode</b> to <b>UDP</b> or <b>TCP Server</b></li>
						<ul>
							<li>If you're having trouble locating the webpage, try running <b>arp -a</b> within the Command Prompt or Shell</li>
							<li>This will resolve, listing the used IP Addresses on the network</li>
							<li>Which you can then verify, by entering the addresses listed (that have the type <b>dynamic</b>) one-by-one into your browsers URL search (e.g. 192.168.0.150)</li>
							<li>You will hopefully soon be greeted by a prompt asking you to sign in (with the details provided in the CueEther manual)</li>
						</ul>
						<h6>If you're unable to find the device webpage:</h6>
						<ul>
							<li>Ensure the CueEther is connected (via Ethernet) to a network reachable by this computer, and powered by USB</li>
							<li>Ensure that your search URL looks something like: http://192.168.0.150/ after searching each address one-by-one</li>
						</ul>
						<li>Once you have access to the i2 Cue Rx webpage, navigate to the <b>Serial Port</b> tab, and wait a moment for it to load</li>
						<li>Then change the <b>Work Mode</b>value to <b>UDP</b> or <b>TCP Server</b> (if it isn't already in the desired mode), and press Save</li>
						<li>You should then be prompted to restart the module, select <b>Restart Module</b></li>
						<li>Now when you visit the <b>Serial Port</b> tab (after the module restarts), the <b>Work Mode</b> should have updated to your desired mode. Otherwise repeat from <b>Step 3</b></li>
					</ol>
					<h4>Companion Setup</h4>
					<ol>
						<li>With the CueEther configured to your needs, ensure that the Protocol below corresponds with the selected <b>Work Mode</b></li>
						<li>In the case that the CueEther has been configured as a <b>TCP Server</b>, enter the known Fixed IP Address into the </b>CueEther Fixed IP</b> field</li>
						<li>Otherwise the default values should be adequate for a <b>UDP Server</b></li>
						<li>Now by adding the Cue Presets to your Companion layout, you should be able to Send Cues to your device</li>
						<li>The background of the Cue Presets will light up (red/green/white) on press, if everything has been setup correctly</li>
					</ol>
					<a href="https://github.com/bitfocus/companion-module-interspace-cueether" target="_new" class="btn">CueEther Module Github</a>
				</div>
			`,
	},
	Options.Protocol,
	Options.Port,
	Options.TargetIP,
	Options.BroadcastIP
]
