const Options = require('./options')
const Styles = require('./styles')

module.exports = async function(self) {
	self.setFeedbackDefinitions({
		ack_cue_feedback: {
			type: 'advanced',
			name: 'Acknowledge Cue',
			description: 'Indicates Cue being received by CueEther (Last Feedback step)',
			options: [Options.CueType],
			// Triggered for every button with this feedback
			callback: async(feedback) => {
				var _type = self.lastCuePress;
				// This button isn't of the lastCuePress 
				if (_type == undefined || feedback.options.cueType != _type) {
					return Styles.Default;
				}
				if (_type == 'next') {
					self.lastCuePress = undefined;
					return Styles.NextAck; 
				} else if (_type == 'back') {
					self.lastCuePress = undefined;
					return Styles.BackAck;
				} else if (_type == 'black') {
					self.lastCuePress = undefined;
					return Styles.BlackoutAck;
				}
			}
		},
	});
}
