#!/bin/bash
echo "----------------------------------------------------------------"
echo "  Render Database Initializer"
echo "----------------------------------------------------------------"
echo ""
echo "1. Go to your Render Dashboard."
echo "2. Click on your Postgres Database."
echo "3. Copy the 'External Database URL' (starts with postgres://...)"
echo ""
echo "Paste the URL below and press ENTER:"
read DB_URL

# Remove any spaces
DB_URL=$(echo "$DB_URL" | xargs)

if [[ $DB_URL != postgres://* ]]; then
  echo ""
  echo "❌ That doesn't look like a valid Postgres URL."
  echo "It should start with 'postgres://'"
  echo "Please try again."
  exit 1
fi

echo ""
echo "Connecting to database..."
psql "$DB_URL" -f "init.sql"

echo ""
echo "✅ If you see 'CREATE TABLE' messages above, it worked!"
