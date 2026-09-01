const webpush = require("web-push");

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const { subscription, title, body, url } = req.body || {};

    // Validate subscription
    if (
      !subscription ||
      !subscription.endpoint ||
      !subscription.keys ||
      !subscription.keys.p256dh ||
      !subscription.keys.auth
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid push subscription"
      });
    }

    const payload = JSON.stringify({
      title: title || "HealthScope",
      body: body || "It's time to check in with your wellness.",
      url: url || "/",
      icon: "/healthscope-icon-192.png",
      badge: "/healthscope-icon-192.png"
    });

    await webpush.sendNotification(subscription, payload);

    return res.status(200).json({
      success: true,
      message: "Push notification sent successfully"
    });

  } catch (error) {
    console.error("Push notification error:", error);

    // Subscription has expired or is no longer valid
    if (error.statusCode === 404 || error.statusCode === 410) {
      return res.status(410).json({
        success: false,
        error: "Push subscription has expired or is no longer valid"
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to send push notification"
    });
  }
};
