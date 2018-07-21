#!/usr/bin/env bash

OFFLINE_ASSETS_DIR=storybook-offline-assets
OFFLINE_CONF_DIR=.storybook-offline-config
PARASTORAGE_OFFLINE_DIR=$OFFLINE_ASSETS_DIR/static.parastorage.com

# ---------- Config ----------
# Copy storybook config to offline config
rm -rf $OFFLINE_CONF_DIR
cp -r .storybook $OFFLINE_CONF_DIR

# Overwrite manager-head.html and preview-head.html
cp -r dev/.storybook-offline-config/* $OFFLINE_CONF_DIR

# ---------- Assets ----------
# The $PARASTORAGE_OFFLINE_DIR is a partial file structure like in `static.parastorage.com`.
# It includes the minimum set of files needed by storybook.
# It is used for development, to run storybook when there is no internet connection.

# The following files should be downloaded at least once - to make the available offline
FONT_FACE_PATH=services/third-party/fonts/Helvetica/fontFace.css
if [ ! -f "$PARASTORAGE_OFFLINE_DIR/$FONT_FACE_PATH" ]; then
  echo "fontFace.css does not exist - downloading and saving to $PARASTORAGE_OFFLINE_DIR/$FONT_FACE_PATH"
  mkdir -p $PARASTORAGE_OFFLINE_DIR/services/third-party/fonts/Helvetica
  curl http://static.parastorage.com/$FONT_FACE_PATH -o $PARASTORAGE_OFFLINE_DIR/$FONT_FACE_PATH
fi
