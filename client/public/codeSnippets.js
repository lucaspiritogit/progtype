export const snippets = [
  {
    language: "typescript",
    code: `const findMax = (numbers: number[]): number => {
    if (numbers.length === 0) {
        return -1;
    }

    let max = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }

    return max;
};`,
  },
  {
    language: "typescript",
    code: `interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return \`\Hello, \$\{person.name}! You are \$\{person.age} years old.\`\;
}

const user: Person = {
    name: "John",
    age: 25,
};

console.log(greet(user));`,
  },
  {
    language: "javascript",
    code: `const greet = (name) => {
    return \`Hello, \${name}!\`;
};`,
  },
  {
    language: "javascript",
    code: `const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num ** 2);`,
  },
  {
    language: "java",
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    language: "java",
    code: `public class SumCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the first number: ");
        int num1 = scanner.nextInt();

        System.out.print("Enter the second number: ");
        int num2 = scanner.nextInt();

        int sum = num1 + num2;

        System.out.println("Sum: " + sum);
     }
}`,
  },
  {
    language: "python",
    code: `def calculate_sum(numbers):
    return sum(numbers)

numbers = [1, 2, 3, 4, 5]
total_sum = calculate_sum(numbers)
print(f"The sum of the numbers is: {total_sum}")`,
  },
  {
    language: "python",
    code: `def reverse_string(input_str):
    return input_str[::-1]

original_str = "Python is fun!"
reversed_str = reverse_string(original_str)
print(f"Original String: {original_str}")
print(f"Reversed String: {reversed_str}")`,
  },
];
