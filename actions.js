const Options = require('./options')

module.exports = function(self) {

	self.setActionDefinitions({
		send_cue_action: {
			name: 'Send Cue',
			description: 'Send Cue to configured CueEther',
			options: [Options.CueType, Options.Channel],
			callback: async(event) => {
				// All channels selected
				if (event.options.channel.length >= 4) {
					await self.buildSendPacket(event.options.cueType, 5); // Sends to all channels
				} else {
					for (let _i = 0; _i < event.options.channel.length; _i++) {
						await self.buildSendPacket(event.options.cueType, event.options.channel[_i]); // Sends to specific channel
					}
				}
			}
		},
	})
}
