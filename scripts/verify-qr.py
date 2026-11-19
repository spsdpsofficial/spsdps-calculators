"""Decode every QR matrix from verify-qr-dump.mjs with OpenCV's Aruco-based detector and compare with the text.

Needs: pip install opencv-python numpy. The older cv2.QRCodeDetector sometimes fails to *locate* large codes,
so it is not used. Exit code 1 if any code fails to decode to the original text.
"""
import json
import sys

import cv2
import numpy as np

cases = json.load(open(sys.argv[1]))
detector = cv2.QRCodeDetectorAruco()
failures = 0
for case in cases:
    modules = np.array(case["modules"], dtype=np.uint8)
    n, scale, border = modules.shape[0], 8, 4
    img = np.full(((n + 2 * border) * scale,) * 2, 255, np.uint8)
    for y in range(n):
        for x in range(n):
            if modules[y][x]:
                img[(y + border) * scale:(y + border + 1) * scale, (x + border) * scale:(x + border + 1) * scale] = 0
    decoded, _, _ = detector.detectAndDecode(img)
    if decoded != case["text"]:
        failures += 1
        print(f"FAIL version {case['version']} level {case['level']} ({len(case['text'].encode())} bytes)")
print(f"{len(cases)} codes checked, {failures} failures")
sys.exit(1 if failures else 0)
