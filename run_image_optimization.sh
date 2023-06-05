BASE_DIR=
read -r -p "Path: " BASE_DIR

BASE_DIR=$(eval echo $BASE_DIR)
RESIZE_DIR="${BASE_DIR}/resized"
OPTIMIZED_DIR="${BASE_DIR}/optimized"

if [ ! -d $RESIZE_DIR ] ; then
    mkdir $RESIZE_DIR
fi

if [ ! -d $OPTIMIZED_DIR ] ; then
    mkdir $OPTIMIZED_DIR
fi

$(magick mogrify -path $RESIZE_DIR -resize 50% -quality 80 "${BASE_DIR}/*.jpg")

for FILE in $(find "${RESIZE_DIR}" -type f \( -iname \*.jpg \)) ; do
    if [ ! -f "$FILE" ]; then
        continue;
    fi
    if [[ "$FILE" == *"$OPTIMIZED_DIR"* ]]; then
        continue;
    fi
    FILENAME=$(basename $FILE)
    avifenc "${FILE}" "${OPTIMIZED_DIR}/${FILENAME%.*}.avif";
done
