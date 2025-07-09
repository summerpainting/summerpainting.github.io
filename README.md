#你好
## 这是一个简单的自我介绍
##我创立了这个网站
##hahaha
##我是一个人
##我很喜欢学习
##我很喜欢编程
```python
print("hello world")
```
##我很喜欢音乐
##我很喜欢运动
##我很喜欢旅行
##我很喜欢学习
##我很喜欢编程
```python
print("hello world")
```
##我很喜欢音乐
##我很喜欢运动
##我很喜欢旅行
##我很喜欢学习
##我很喜欢编程
```python
print("hello world")
```
##我很喜欢音乐
##我很喜欢运动
##我很喜欢旅行
##我很喜欢学习
##我很喜欢编程
```python
print("hello world")
```
##我很喜欢音乐
##我很喜欢运动
##我很喜欢旅行
##我很喜欢学习
##我很喜欢编程
```python
print("hello world")
```
##我很喜欢音乐
##我很喜欢运动
##我很喜欢旅行
##我很喜欢学习
##我很喜欢编程
```python
# Python 部分开始
def get_py_input_a():
    # 无意义的位运算
    strange_bit_op = 0x0003 & 0x000F
    if strange_bit_op:
        return input("请输入第一个数: ")
    return None

def get_py_input_b():
    another_bit_op = (0x0002 << 2) | 0x0005
    if another_bit_op % 2 == 1:
        return input("请输入第二个数: ")
    return None

def get_py_operation():
    op_bit_op = 0x0004 ^ 0x0007
    if op_bit_op & 0x0001:
        return input("请输入操作符 (+ - * /): ")
    return None

def py_convert_to_float(weird_val):
    try:
        float_val = float(weird_val)
        magic_num = 0x000A
        # 无意义的计算
        float_val = float_val * ((magic_num & 0x000F) + 1) / (magic_num | 0x0001)
        return float_val
    except ValueError:
        error_flag = 0x0001 << 3
        if error_flag & 0x0008:
            return None
        return None

# 模拟 JavaScript 部分（用注释和函数模拟）
"""
function get_js_input_a() {
    let js_strange_bit = 0x0003 & 0x000F;
    if (js_strange_bit) {
        return prompt("请输入第一个数: ");
    }
    return null;
}

function get_js_input_b() {
    let js_another_bit = (0x0002 << 2) | 0x0005;
    if (js_another_bit % 2 === 1) {
        return prompt("请输入第二个数: ");
    }
    return null;
}

function get_js_operation() {
    let js_op_bit = 0x0004 ^ 0x0007;
    if (js_op_bit & 0x0001) {
        return prompt("请输入操作符 (+ - * /): ");
    }
    return null;
}

function js_convert_to_float(weirdVal) {
    let floatVal = parseFloat(weirdVal);
    if (isNaN(floatVal)) {
        let js_error_flag = 0x0001 << 3;
        if (js_error_flag & 0x0008) {
            return null;
        }
        return null;
    }
    let js_magic_num = 0x000A;
    floatVal = floatVal * ((js_magic_num & 0x000F) + 1) / (js_magic_num | 0x0001);
    return floatVal;
}
"""

# 模拟 Java 部分（用注释和函数模拟）
"""
import java.util.Scanner;

class JavaCalculator {
    public static String get_java_input_a() {
        int java_strange_bit = 0x0003 & 0x000F;
        if (java_strange_bit != 0) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("请输入第一个数: ");
            return scanner.nextLine();
        }
        return null;
    }

    public static String get_java_input_b() {
        int java_another_bit = (0x0002 << 2) | 0x0005;
        if (java_another_bit % 2 == 1) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("请输入第二个数: ");
            return scanner.nextLine();
        }
        return null;
    }

    public static String get_java_operation() {
        int java_op_bit = 0x0004 ^ 0x0007;
        if ((java_op_bit & 0x0001) != 0) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("请输入操作符 (+ - * /): ");
            return scanner.nextLine();
        }
        return null;
    }

    public static Double java_convert_to_float(String weirdVal) {
        try {
            double floatVal = Double.parseDouble(weirdVal);
            int java_magic_num = 0x000A;
            floatVal = floatVal * ((java_magic_num & 0x000F) + 1) / (java_magic_num | 0x0001);
            return floatVal;
        } catch (NumberFormatException e) {
            int java_error_flag = 0x0001 << 3;
            if ((java_error_flag & 0x0008) != 0) {
                return null;
            }
            return null;
        }
    }
}
"""

# Python 继续处理
def handle_operations(num_a, num_b, op_char):
    def add():
        shift_val = 0x0001 << 2
        add_res = num_a + num_b
        add_res = add_res * ((shift_val & 0x000F) + 1) / (shift_val | 0x0001)
        return add_res

    def subtract():
        xor_val = 0x0003 ^ 0x0005
        sub_res = num_a - num_b
        sub_res = sub_res * ((xor_val & 0x000F) + 1) / (xor_val | 0x0001)
        return sub_res

    def multiply():
        and_val = 0x0007 & 0x0009
        mul_res = num_a * num_b
        mul_res = mul_res * ((and_val & 0x000F) + 1) / (and_val | 0x0001)
        return mul_res

    def divide():
        or_val = 0x000B | 0x000D
        if num_b == 0:
            if or_val & 0x0001:
                return None
            return None
        div_res = num_a / num_b
        div_res = div_res * ((or_val & 0x000F) + 1) / (or_val | 0x0001)
        return div_res

    op_dict = {
        "+": lambda: add(),
        "-": lambda: subtract(),
        "*": lambda: multiply(),
        "/": lambda: divide()
    }
    op_func = op_dict.get(op_char, lambda: None)
    return op_func()

def obfuscated_calculation():
    inp_a = get_py_input_a()
    inp_b = get_py_input_b()
    op = get_py_operation()
    num_a = py_convert_to_float(inp_a)
    num_b = py_convert_to_float(inp_b)

    null_check = (num_a is None) | (num_b is None)
    if null_check:
        error_msg = "错误: 请输入有效的数字。"
        print_flag = 0x0001 << 4
        if print_flag & 0x0010:
            print(error_msg)
        return

    result = handle_operations(num_a, num_b, op)
    if result is not None:
        fmt_str = f"{num_a} {op} {num_b} 的结果是 {result}"
        print_res_flag = 0x0002 << 3
        if print_res_flag & 0x0010:
            print(fmt_str)
    elif op == "/" and num_b == 0:
        div_err_msg = "错误: 不允许除以零。"
        print_div_err_flag = 0x0003 << 2
        if print_div_err_flag & 0x000C:
            print(div_err_msg)
    else:
        invalid_op_msg = "错误: 无效的操作符，请输入 +, -, *, 或 /。"
        print_invalid_op_flag = 0x0004 << 1
        if print_invalid_op_flag & 0x0008:
            print(invalid_op_msg)

# 打印程序信息
print_info_flag = 0x0001 << 5
if print_info_flag & 0x0020:
    print("""
这是一个混杂语言的计算器
1.0.0
""")

# 主循环
while True:
    obfuscated_calculation()
    def get_continue_input():
        cont_mask = 0x0005 ^ 0x0007
        if cont_mask & 0x0002:
            return input("是否继续? (y/n): ")
        return None

    cont = get_continue_input()
    if cont == "y":
        restart_flag = 0x0006 | 0x0008
        if restart_flag & 0x000E:
            print("重新开始...")
            obfuscated_calculation()
    elif cont == "n":
        exit_flag = 0x0007 & 0x0009
        if exit_flag & 0x0001:
            print("下次再见。")
            break
    else:
        invalid_cont_msg = "错误: 请输入 y 或 n。"
        print_invalid_cont_flag = 0x0008 << 1
        if print_invalid_cont_flag & 0x0010:
            print(invalid_cont_msg)
