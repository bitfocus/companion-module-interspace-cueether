const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGrey = combineRgb(100, 100, 100);
	const ColorBlack = combineRgb(0, 0, 0);
	self.setPresetDefinitions({
		Next : {
			type: 'button',
			category: 'CueEther',
			name: 'Send Next Cue',
			style: {
				text: 'Next',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
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
		Back : {
			type: 'button',
			category: 'CueEther',
			name: 'Send Back Cue',
			style: {
				text: 'Back',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
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
			style: {
				text: 'Backout',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
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
	});
}
