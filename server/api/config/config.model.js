const mongoose = require('mongoose');

const configSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 100,
		},
		value: {
			type: mongoose.Schema.Types.Mixed,
			default: null,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 255,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

configSchema.index({ key: 1 }, { unique: true });

configSchema.statics.getValue = async function (key, defaultValue = null) {
	const record = await this.findOne({ key });
	return record ? record.value : defaultValue;
};

configSchema.statics.setValue = async function (key, value, description) {
	const update = { value };
	if (description !== undefined) {
		update.description = description;
	}

	return this.findOneAndUpdate(
		{ key },
		{ $set: update },
		{ new: true, upsert: true, setDefaultsOnInsert: true }
	);
};

configSchema.statics.ensureDefaultConfigs = async function () {
	const defaults = [{ key: 'orderId', value: 0 }];

	await Promise.all(
		defaults.map((config) =>
			this.updateOne(
				{ key: config.key },
				{
					$setOnInsert: config,
				},
				{ upsert: true }
			)
		)
	);
};

const Config = mongoose.model('Config', configSchema);

Config.ensureDefaultConfigs().catch((error) => {
	console.error('Failed to initialize default config values:', error);
});

module.exports = Config;
