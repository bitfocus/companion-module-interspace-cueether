const { combineRgb } = require('@companion-module/base')

module.exports = {
	Default: {
		bgcolor: combineRgb(0, 0, 0),
	},
	NextAck: {
		bgcolor: combineRgb(0, 255, 0),
	},

	BackAck: {
		bgcolor: combineRgb(255, 0, 0),
	},

	BlackoutAck: {
		bgcolor: combineRgb(255, 255, 255),
	},
};