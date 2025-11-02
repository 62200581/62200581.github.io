# Animal Classification Project

## 🦋 Deep Learning Animal Classification System

A comprehensive machine learning project that classifies 10 different animals using deep learning and transfer learning techniques.

## 📊 Project Overview

- **Model**: MobileNetV2 with Transfer Learning
- **Dataset**: Animals10 (26,179 images)
- **Classes**: 10 animals (dog, horse, elephant, butterfly, chicken, cat, cow, sheep, spider, squirrel)
- **Accuracy**: **93.945%** validation accuracy
- **Framework**: TensorFlow/Keras

## 🎯 Key Features

- **Transfer Learning**: Fine-tuned MobileNetV2 pre-trained on ImageNet
- **Data Augmentation**: Random flip, rotation, and zoom for better generalization
- **Model Optimization**: Dropout regularization and early stopping
- **Comprehensive Evaluation**: Confusion matrix and classification report
- **Real-time Prediction**: Upload and classify new images

## 📈 Performance Results

| Animal | Precision | Recall | F1-Score |
|--------|-----------|--------|----------|
| Spider | 99% | 98% | 98% |
| Butterfly | 98% | 95% | 96% |
| Cat | 98% | 89% | 93% |
| Dog | 97% | 91% | 94% |
| Squirrel | 97% | 94% | 96% |
| Horse | 93% | 92% | 93% |
| Chicken | 92% | 99% | 95% |
| Sheep | 91% | 88% | 89% |
| Elephant | 90% | 97% | 94% |
| Cow | 82% | 95% | 88% |

**Overall Accuracy: 93.945%**

## 🛠️ Technical Implementation

### Model Architecture
- **Base Model**: MobileNetV2 (pre-trained on ImageNet)
- **Transfer Learning**: First 100 layers frozen, remaining layers fine-tuned
- **Input Size**: 160x160 pixels
- **Batch Size**: 32
- **Epochs**: 15 with early stopping

### Data Processing
- **Training Set**: 20,944 images (80%)
- **Validation Set**: 5,235 images (20%)
- **Augmentation**: Random horizontal flip, rotation (±0.2), zoom (±0.1)
- **Normalization**: Rescaling to [0,1] range

### Model Layers
```
1. Rescaling (1./255)
2. RandomFlip (horizontal)
3. RandomRotation (0.2)
4. RandomZoom (0.1)
5. MobileNetV2 (base model)
6. GlobalAveragePooling2D
7. Dropout (0.3)
8. Dense (256, ReLU)
9. Dropout (0.3)
10. Dense (10, Softmax)
```

## 🚀 Usage

### Training the Model
```python
# Load dataset
train_ds = keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=1337,
    image_size=(160, 160),
    batch_size=32
)

# Train model
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=15,
    callbacks=[keras.callbacks.EarlyStopping(patience=3)]
)
```

### Making Predictions
```python
# Load and preprocess image
img = keras.utils.load_img(image_path, target_size=(160, 160))
x = keras.utils.img_to_array(img)[None, ...]

# Predict
prediction = model.predict(x)
predicted_class = class_names[np.argmax(prediction)]
confidence = np.max(prediction)
```

## 📁 Files

- `animal-classification.ipynb` - Complete Jupyter notebook with training and evaluation
- `README.md` - Project documentation

## 🎓 Skills Demonstrated

- **Deep Learning**: CNN architecture design and implementation
- **Transfer Learning**: Leveraging pre-trained models for better performance
- **Computer Vision**: Image classification and preprocessing
- **Model Optimization**: Hyperparameter tuning and regularization
- **Data Analysis**: Performance evaluation and visualization
- **TensorFlow/Keras**: Industry-standard ML frameworks

## 🔗 Dataset

Dataset: [Animals10 on Kaggle](https://www.kaggle.com/datasets/alessiocorrado99/animals10)
- **License**: GPL-2.0
- **Images**: 26,179 total
- **Classes**: 10 animal species
- **Format**: JPG images in organized folders

## 📊 Results Summary

This project demonstrates proficiency in:
- ✅ End-to-end machine learning pipeline
- ✅ Transfer learning and fine-tuning
- ✅ Computer vision and image classification
- ✅ Model evaluation and performance analysis
- ✅ Real-world application development

The **93.945% accuracy** achieved showcases the effectiveness of transfer learning and proper model optimization techniques.




