const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { reminder, subscription } = req.body || {};

    if (!reminder || !reminder.id) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reminder'
      });
    }

    if (
      !subscription ||
      !subscription.endpoint ||
      !subscription.keys ||
      !subscription.keys.p256dh ||
      !subscription.keys.auth
    ) {
      return res.status(400).json({
        success: false,
        error: 'Push subscription is required'
      });
    }

    await redis.set(
      `reminder:${reminder.id}`,
      JSON.stringify({
        reminder,
        subscription
      })
    );

    return res.status(200).json({
      success: true,
      message: 'Reminder saved'
    });

  } catch (error) {
    console.error('Save reminder error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to save reminder'
    });
  }
};
