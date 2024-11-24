import json
import random

def generate_questions(
    num_questions=20,
    amplitude_range=(1, 8),
    amplitude_step=1,
    frequency_range=(0.5, 4),
    frequency_step=0.5,
    period_range=(0.25, 1.0),
    period_step=0.125
):
    questions = []

    for _ in range(num_questions):
        amplitude = random.randint(
            int(amplitude_range[0] / amplitude_step), 
            int(amplitude_range[1] / amplitude_step)
        ) * amplitude_step

        if random.choice(["frequency", "period"]) == "frequency":
            frequency = random.randint(
                int(frequency_range[0] / frequency_step), 
                int(frequency_range[1] / frequency_step)
            ) * frequency_step
            period = round(1 / frequency, 3)
        else:
            period = random.randint(
                int(period_range[0] / period_step), 
                int(period_range[1] / period_step)
            ) * period_step
            frequency = round(1 / period, 3)

        questions.append({
            "amplitude": amplitude,
            "frequency": round(frequency, 1),
            "period": round(period, 3)
        })

    return questions

settings = {
    "num_questions": 200,
    "amplitude_range": (1, 8),
    "amplitude_step": 1,
    "frequency_range": (0.5, 4),
    "frequency_step": 0.5,
    "period_range": (0.25, 1.0),
    "period_step": 0.125
}

questions = generate_questions(
    num_questions=settings["num_questions"],
    amplitude_range=settings["amplitude_range"],
    amplitude_step=settings["amplitude_step"],
    frequency_range=settings["frequency_range"],
    frequency_step=settings["frequency_step"],
    period_range=settings["period_range"],
    period_step=settings["period_step"]
)

output_file = "questions.json"
with open(output_file, "w") as file:
    json.dump({"questions": questions}, file, indent=4)

print(f"Done.")
