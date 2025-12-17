#!/bin/sh
set -e

# Default values (safe defaults, no credentials)
PUBLIC_API_BASE_URL=${PUBLIC_API_BASE_URL:-http://localhost:8080}
PUBLIC_API_TIMEOUT=${PUBLIC_API_TIMEOUT:-30000}
PUBLIC_APP_NAME=${PUBLIC_APP_NAME:-Savinco Frontend}
PUBLIC_APP_VERSION=${PUBLIC_APP_VERSION:-1.0.0}
PUBLIC_POSTHOG_KEY=${PUBLIC_POSTHOG_KEY:-}
PUBLIC_POSTHOG_HOST=${PUBLIC_POSTHOG_HOST:-https://app.posthog.com}

# Escape values for JSON (handle special characters)
escape_json() {
  echo "$1" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed 's/\$/\\$/g'
}

API_BASE_URL_ESC=$(escape_json "$PUBLIC_API_BASE_URL")
API_TIMEOUT_ESC=$(escape_json "$PUBLIC_API_TIMEOUT")
APP_NAME_ESC=$(escape_json "$PUBLIC_APP_NAME")
APP_VERSION_ESC=$(escape_json "$PUBLIC_APP_VERSION")
POSTHOG_KEY_ESC=$(escape_json "$PUBLIC_POSTHOG_KEY")
POSTHOG_HOST_ESC=$(escape_json "$PUBLIC_POSTHOG_HOST")

# Create runtime environment object as JavaScript
ENV_SCRIPT="<script>window.__ENV__ = { \
  \"PUBLIC_API_BASE_URL\": \"$API_BASE_URL_ESC\", \
  \"PUBLIC_API_TIMEOUT\": \"$API_TIMEOUT_ESC\", \
  \"PUBLIC_APP_NAME\": \"$APP_NAME_ESC\", \
  \"PUBLIC_APP_VERSION\": \"$APP_VERSION_ESC\", \
  \"PUBLIC_POSTHOG_KEY\": \"$POSTHOG_KEY_ESC\", \
  \"PUBLIC_POSTHOG_HOST\": \"$POSTHOG_HOST_ESC\" \
};</script>"

# Find all HTML files and inject window.__ENV__ before closing </head> tag
find /usr/share/nginx/html -type f -name "*.html" | while read -r file; do
  # Check if window.__ENV__ already exists
  if ! grep -q "window.__ENV__" "$file"; then
    # Inject before </head> if it exists, otherwise before </body>
    if grep -q "</head>" "$file"; then
      sed -i "s|</head>|$ENV_SCRIPT</head>|" "$file"
    elif grep -q "</body>" "$file"; then
      sed -i "s|</body>|$ENV_SCRIPT</body>|" "$file"
    else
      # If neither tag exists, prepend to the file
      echo "$ENV_SCRIPT" | cat - "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
  fi
done

# Execute the main command (nginx)
exec "$@"
