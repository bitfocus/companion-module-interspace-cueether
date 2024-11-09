const Options = require('./options')

module.exports = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `
				<h3>Welcome</h3>
				<div>
					This Companion module allows you to send Cues directly to a CueEther via TCP or as a UDP broadcast to multiple units.
					<a href="https://github.com/Luuccc/companion-module-interspace-cueether" target="_new" class="btn">CueEther Module github</a>
				</div>
			`,
	},
	Options.Protocol,
	Options.Port,
	Options.TargetIP,
	Options.BroadcastIP
]
