const Styles = require('./styles')

module.exports = async function (self) {
	self.setPresetDefinitions({
		Back : {
			type: 'button',
			category: 'CueEther',
			name: 'Send Back Cue',
			style: Styles.FullBack,
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'back',
							channel: ['1', '2', '3', '4']
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'ack_cue_feedback',
				options: {
					cueType: 'back'
				}
			}]
		},
		Blackout : {
			type: 'button',
			category: 'CueEther',
			name: 'Send Blackout Cue',
			style: Styles.FullBlackout,
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'black',
							channel: ['1', '2', '3', '4']
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'ack_cue_feedback',
				options: {
					cueType: 'black'
				}
			}]
		},
		Next : {
			type: 'button',
			category: 'CueEther',
			name: 'Send Next Cue',
			style: Styles.FullNext,
			steps: [{
					down: [{
						actionId: 'send_cue_action',
						options: {
							cueType: 'next',
							channel: ['1', '2', '3', '4']
						}
					}],
					up: []
			}],
			feedbacks: [{
				feedbackId: 'ack_cue_feedback',
				options: {
					cueType: 'next'
				}
			}]
		},
	});
}
