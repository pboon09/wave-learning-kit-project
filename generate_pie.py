import matplotlib.pyplot as plt

# Data for both sets
set_1 = [7, 8, 7, 6, 10, 6, 9, 8, 8, 7, 6, 10, 9, 9, 8, 7, 9, 10, 8, 6]
set_2 = [9, 14, 12, 14, 15, 11, 13, 13, 10, 11, 14, 15, 11, 13, 14, 15, 12, 13, 14, 10]

# Get unique scores for labeling
labels_1 = sorted(set(set_1))
labels_2 = sorted(set(set_2))

# Count occurrences for each set
counts_1 = [set_1.count(score) for score in labels_1]
counts_2 = [set_2.count(score) for score in labels_2]

# Plot pie charts
fig, axes = plt.subplots(1, 2, figsize=(14, 7))

# Set 1 Pie Chart
axes[0].pie(counts_1, labels=labels_1, autopct='%1.1f%%', startangle=140, colors=['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'])
# axes[0].set_title('คะแนนสอบชุดที่ 1')

# Set 2 Pie Chart
axes[1].pie(counts_2, labels=labels_2, autopct='%1.1f%%', startangle=140, colors=['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'])
# axes[1].set_title('คะแนนสอบชุดที่ 2')

# Main title for both pie charts
# plt.suptitle('คะแนนสอบทั้ง 2 ชุด')

plt.show()
