#!/usr/bin/python3
import sys

def print_stats(total_size, status_counts):
    print(f"File size: {total_size}")
    for status_code in sorted(status_counts.keys()):
        print(f"{status_code}: {status_counts[status_code]}")

def main():
    total_size = 0
    status_counts = {}
    line_count = 0

    try:
        for line in sys.stdin:
            line_count += 1
            parts = line.split()
            
            if len(parts) >= 9:
                status_code = parts[-2]
                file_size = int(parts[-1])
                
                total_size += file_size

                if status_code.isdigit():
                    status_code = int(status_code)
                    status_counts[status_code] = status_counts.get(status_code, 0) + 1

            if line_count % 10 == 0:
                print_stats(total_size, status_counts)

    except KeyboardInterrupt:
        # Handle keyboard interruption (CTRL + C)
        print_stats(total_size, status_counts)
        sys.exit(0)

if __name__ == "__main__":
    main()
