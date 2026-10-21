#!/usr/bin/env bash
# Usage: STATS_SECRET=... scripts/stats.sh [raw|delete_test]
q=""; [ "$1" = raw ] && q="?raw=1"; [ "$1" = delete_test ] && q="?delete_test=1"
curl -s -H "x-stats-secret: $STATS_SECRET" "https://selfhostoffice.com/api/stats$q"; echo
