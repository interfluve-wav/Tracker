import datetime
import json
import os

class CigaretteTracker:
    def __init__(self):
        self.data_file = 'smoking_data.json'
        self.load_data()

    def load_data(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                self.data = json.load(f)
        else:
            self.data = {}

    def save_data(self):
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2)

    def add_cigarette(self):
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        self.data[today] = self.data.get(today, 0) + 1
        self.save_data()
        print(f"Logged 1 cigarette. Total today: {self.data[today]}")

    def show_stats(self):
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        print("\n=== Smoking Statistics ===")
        print(f"Today ({today}): {self.data.get(today, 0)} cigarettes")
        
        if len(self.data) > 1:
            total = sum(self.data.values())
            avg = total / len(self.data)
            print(f"Daily average: {avg:.1f} cigarettes")

def main():
    tracker = CigaretteTracker()
    
    while True:
        print("\n1. Log cigarette")
        print("2. Show stats")
        print("3. Exit")
        
        choice = input("Choose an option (1-3): ")
        
        if choice == '1':
            tracker.add_cigarette()
        elif choice == '2':
            tracker.show_stats()
        elif choice == '3':
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()