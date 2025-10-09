import pandas as pd
import numpy as np

data = {
    "Name": ["Amit", "Sita", "Ravi", "Meena", None],
    "Age": [25, None, 30, 28, 22],
    "Marks": [85, 90, None, 70, 95]
}
df = pd.DataFrame(data)

print("Original Dataset:")
print(df)

print("\nMissing Value Check:")
print(df.isnull())

df["Age"].fillna(df["Age"].mean(), inplace=True)
df["Marks"].fillna(df["Marks"].median(), inplace=True)
df["Name"].fillna("Unknown", inplace=True)

print("\nDataset after handling missing values:")
print(df)
