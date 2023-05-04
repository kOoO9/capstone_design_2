from mtcnn import MTCNN
import cv2

detector = MTCNN()

# Load the image
image = cv2.imread("image.jpg")

# Detect faces in the image
faces = detector.detect_faces(image)

# Print the bounding box coordinates for each face detected
for face in faces:
    print(face["box"])
