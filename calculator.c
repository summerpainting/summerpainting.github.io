#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <ctype.h>
#include <windows.h>

// 定义颜色常量
#define RESET   "\033[0m"
#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"
#define WHITE   "\033[37m"

// 定义运算类型枚举
typedef enum {
    ADD, SUB, MUL, DIV,
    POW, SQRT, SIN, COS, TAN,
    LOG, LOG10, EXP, MOD,
    CLEAR, EXIT, EQUALS
} OperationType;

// 定义运算函数指针类型
typedef double (*MathFunc)(double, double);

// 运算函数实现
double add(double a, double b) { return a + b; }
double sub(double a, double b) { return a - b; }
double mul(double a, double b) { return a * b; }
double div(double a, double b) { return (b != 0) ? a / b : INFINITY; }
double power(double a, double b) { return pow(a, b); }
double sqrt_op(double a, double b) { return sqrt(a); }
double sin_op(double a, double b) { return sin(a * M_PI / 180); }
double cos_op(double a, double b) { return cos(a * M_PI / 180); }
double tan_op(double a, double b) { return tan(a * M_PI / 180); }
double log_op(double a, double b) { return log(a); }
double log10_op(double a, double b) { return log10(a); }
double exp_op(double a, double b) { return exp(a); }
double mod(double a, double b) { return fmod(a, b); }

// 运算结构体
typedef struct {
    char key;
    char* name;
    char* symbol;
    OperationType type;
    MathFunc func;
    int param_count;
    char* color;
} Operation;

// 运算表 - 使用函数指针表优化运算逻辑
Operation operations[] = {
    {'+', "加法", "+", ADD, add, 2, GREEN},
    {'-', "减法", "-", SUB, sub, 2, GREEN},
    {'*', "乘法", "×", MUL, mul, 2, GREEN},
    {'/', "除法", "÷", DIV, div, 2, GREEN},
    {'^', "幂运算", "^", POW, power, 2, YELLOW},
    {'s', "平方根", "√", SQRT, sqrt_op, 1, YELLOW},
    {'i', "正弦", "sin", SIN, sin_op, 1, CYAN},
    {'c', "余弦", "cos", COS, cos_op, 1, CYAN},
    {'t', "正切", "tan", TAN, tan_op, 1, CYAN},
    {'l', "自然对数", "ln", LOG, log_op, 1, MAGENTA},
    {'g', "常用对数", "log", LOG10, log10_op, 1, MAGENTA},
    {'e', "指数函数", "e^x", EXP, exp_op, 1, MAGENTA},
    {'%', "取模", "%", MOD, mod, 2, BLUE},
    {'C', "清除", "C", CLEAR, NULL, 0, RED},
    {'q', "退出", "Q", EXIT, NULL, 0, RED},
    {'=', "等于", "=", EQUALS, NULL, 0, WHITE}
};

#define OP_COUNT (sizeof(operations)/sizeof(operations[0]))

// 栈结构定义 - 用于表达式解析
typedef struct {
    double* data;
    int top;
    int capacity;
} Stack;

// 栈操作函数
Stack* create_stack(int capacity) {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->capacity = capacity;
    stack->top = -1;
    stack->data = (double*)malloc(stack->capacity * sizeof(double));
    return stack;
}

int is_full(Stack* stack) {
    return stack->top == stack->capacity - 1;
}

int is_empty(Stack* stack) {
    return stack->top == -1;
}

void push(Stack* stack, double item) {
    if (is_full(stack)) return;
    stack->data[++stack->top] = item;
}

double pop(Stack* stack) {
    if (is_empty(stack)) return NAN;
    return stack->data[stack->top--];
}

double peek(Stack* stack) {
    if (is_empty(stack)) return NAN;
    return stack->data[stack->top];
}

void free_stack(Stack* stack) {
    free(stack->data);
    free(stack);
}

// 辅助函数：获取运算信息
Operation* get_operation(char key) {
    for (int i = 0; i < OP_COUNT; i++) {
        if (operations[i].key == key) {
            return &operations[i];
        }
    }
    return NULL;
}

// 辅助函数：打印彩色文本
void print_color(const char* color, const char* text) {
    printf("%s%s%s", color, text, RESET);
}

// 辅助函数：打印分隔线
void print_separator() {
    print_color(CYAN, "======================================================\n");
}

// 显示计算器帮助信息
void show_help() {
    system("cls");
    print_separator();
    print_color(YELLOW, "                  高级科学计算器 v1.0\n\n");
    print_color(CYAN, "基本运算: ");
    print_color(GREEN, " + (加法)  - (减法)  * (乘法)  / (除法)\n");
    print_color(CYAN, "科学运算: ");
    print_color(YELLOW, " ^ (幂运算)  s (平方根)\n");
    print_color(CYAN, "三角函数: ");
    print_color(CYAN, " i (正弦)  c (余弦)  t (正切)\n");
    print_color(CYAN, "对数函数: ");
    print_color(MAGENTA, " l (自然对数)  g (常用对数)  e (指数函数)\n");
    print_color(CYAN, "其他功能: ");
    print_color(BLUE, " % (取模)  ");
    print_color(RED, "C (清除)  q (退出)  = (等于)\n");
    print_separator();
}

// 动态进度条效果
void loading_animation() {
    printf("加载中");
    for (int i = 0; i < 3; i++) {
        printf(".");
        fflush(stdout);
        Sleep(300);
    }
    printf("\r          \r"); // 清除加载提示
    fflush(stdout);
}

// 计算表达式结果
double calculate_expression(const char* expression, char* error_msg) {
    Stack* stack = create_stack(20);
    char temp[20] = {0};
    int temp_idx = 0;
    int len = strlen(expression);

    for (int i = 0; i < len; i++) {
        char c = expression[i];

        if (isdigit(c) || c == '.') {
            temp[temp_idx++] = c;
        } else if (c == ' ' || c == '\t') {
            continue;
        } else {
            Operation* op = get_operation(c);
            if (!op) {
                strcpy(error_msg, "无效的运算符");
                free_stack(stack);
                return NAN;
            }

            if (temp_idx > 0) {
                temp[temp_idx] = '\0';
                push(stack, atof(temp));
                temp_idx = 0;
                memset(temp, 0, sizeof(temp));
            }

            if (op->type == CLEAR) {
                while (!is_empty(stack)) pop(stack);
                free_stack(stack);
                return 0;
            } else if (op->type == EQUALS) {
                double result = peek(stack);
                free_stack(stack);
                return result;
            } else if (op->param_count == 1) {
                double a = pop(stack);
                if (isnan(a)) {
                    strcpy(error_msg, "缺少操作数");
                    free_stack(stack);
                    return NAN;
                }
                double res = op->func(a, 0);
                push(stack, res);
            } else if (op->param_count == 2) {
                double b = pop(stack);
                double a = pop(stack);
                if (isnan(a) || isnan(b)) {
                    strcpy(error_msg, "缺少操作数");
                    free_stack(stack);
                    return NAN;
                }
                if (op->type == DIV && b == 0) {
                    strcpy(error_msg, "除数不能为零");
                    free_stack(stack);
                    return NAN;
                }
                double res = op->func(a, b);
                push(stack, res);
            }
        }
    }

    if (temp_idx > 0) {
        temp[temp_idx] = '\0';
        push(stack, atof(temp));
    }

    double result = peek(stack);
    free_stack(stack);
    return result;
}

int main() {
    // 启用ANSI转义序列支持（Windows系统）
    system("chcp 65001 > nul");
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD consoleMode;
    GetConsoleMode(hConsole, &consoleMode);
    consoleMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
    SetConsoleMode(hConsole, consoleMode);

    char input[100];
    double result = 0;
    char error_msg[50] = {0};
    int first_run = 1;

    while (1) {
        if (first_run) {
            show_help();
            first_run = 0;
        } else {
            system("cls");
            show_help();
        }

        print_color(YELLOW, "当前结果: ");
        print_color(GREEN, "%.6g\n\n", result);

        if (error_msg[0] != '\0') {
            print_color(RED, "错误: %s\n\n", error_msg);
            error_msg[0] = '\0';
        }

        print_color(CYAN, "请输入表达式 (例如: 5 3 + 或 9 s): ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = '\0';

        // 处理退出命令
        if (input[0] == 'q' || input[0] == 'Q') {
            print_separator();
            print_color(MAGENTA, "感谢使用高级科学计算器！\n");
            print_separator();
            break;
        }

        // 显示加载动画
        loading_animation();

        // 计算结果
        double new_result = calculate_expression(input, error_msg);
        if (!isnan(new_result)) {
            result = new_result;
        }

        // 短暂延迟，让用户看清结果
        Sleep(1000);
    }

    return 0;
}