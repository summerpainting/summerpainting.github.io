import tkinter as tk
import math
from tkinter import simpledialog, messagebox, ttk

# 圆角按钮类
class RoundedButton(tk.Canvas):
    def __init__(self, parent, text, command=None, radius=18, padding=4, color="#4F8EF7", fg="white", font=('Arial', 13), width=70, height=40):
        tk.Canvas.__init__(self, parent, width=width, height=height, highlightthickness=0, bg=parent['bg'])
        self.command = command
        self.radius = radius
        self.color = color
        self.fg = fg
        self.font = font
        self.text = text
        self.padding = padding
        self.width = width
        self.height = height
        self.create_rounded_rect(0, 0, width, height, radius, fill=color)
        self.create_text(width//2, height//2, text=text, fill=fg, font=font)
        self.bind("<Button-1>", self.on_click)
        self.bind("<Enter>", lambda e: self.itemconfig(1, fill="#3A6ED8"))
        self.bind("<Leave>", lambda e: self.itemconfig(1, fill=color))

    def create_rounded_rect(self, x1, y1, x2, y2, r, **kwargs):
        points = [
            x1+r, y1,
            x2-r, y1,
            x2, y1,
            x2, y1+r,
            x2, y2-r,
            x2, y2,
            x2-r, y2,
            x1+r, y2,
            x1, y2,
            x1, y2-r,
            x1, y1+r,
            x1, y1
        ]
        return self.create_polygon(points, smooth=True, **kwargs)

    def on_click(self, event):
        if self.command:
            self.command()

class ScientificCalculator:
    def __init__(self, master):
        self.master = master
        master.title("科学计算器")
        master.configure(bg="#23272E")
        self.expression = ""
        self.text_input = tk.StringVar()

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TEntry', fieldbackground='#23272E', foreground='white', borderwidth=0, font=('Arial', 20))

        self.entry = ttk.Entry(master, font=('Arial', 20), textvariable=self.text_input, width=22, justify='right', style='TEntry')
        self.entry.grid(row=0, column=0, columnspan=6, padx=10, pady=15, sticky="ew")

        # 按钮布局
        buttons = [
            ('7',1,0), ('8',1,1), ('9',1,2), ('/',1,3), ('sin',1,4), ('log',1,5),
            ('4',2,0), ('5',2,1), ('6',2,2), ('*',2,3), ('cos',2,4), ('ln',2,5),
            ('1',3,0), ('2',3,1), ('3',3,2), ('-',3,3), ('tan',3,4), ('^',3,5),
            ('0',4,0), ('.',4,1), ('(',4,2), (')',4,3), ('√',4,4), ('exp',4,5),
            ('C',5,0), ('<-',5,1), ('%',5,2), ('+',5,3), ('=',5,4,2),
            ('圆面积',6,0), ('圆周长',6,1), ('矩形面积',6,2), ('矩形周长',6,3)
        ]

        self.button_refs = []
        for (text, row, col, *cs) in buttons:
            colspan = cs[0] if cs else 1
            btn = RoundedButton(master, text=text, command=lambda t=text: self.on_button_click(t),
                                color="#4F8EF7" if text not in ('C', '=', '<-') else ("#E94F4F" if text == 'C' else ("#4FE97B" if text == '=' else "#F7B84F")),
                                fg="white", font=('Arial', 13), width=80*colspan, height=44)
            btn.grid(row=row, column=col, columnspan=colspan, padx=6, pady=6, sticky="nsew")
            self.button_refs.append(btn)

        # 响应式布局
        for i in range(7):
            master.grid_rowconfigure(i, weight=1)
        for i in range(6):
            master.grid_columnconfigure(i, weight=1)

    def on_button_click(self, char):
        if char == 'C':
            self.expression = ""
            self.text_input.set("")
        elif char == '<-':
            self.expression = self.expression[:-1]
            self.text_input.set(self.expression)
        elif char == '=':
            try:
                result = self.evaluate(self.expression)
                self.text_input.set(result)
                self.expression = str(result)
            except Exception:
                self.text_input.set("错误")
                self.expression = ""
        elif char == 'sin':
            self.expression += "sin("
            self.text_input.set(self.expression)
        elif char == 'cos':
            self.expression += "cos("
            self.text_input.set(self.expression)
        elif char == 'tan':
            self.expression += "tan("
            self.text_input.set(self.expression)
        elif char == 'log':
            self.expression += "log10("
            self.text_input.set(self.expression)
        elif char == 'ln':
            self.expression += "log("
            self.text_input.set(self.expression)
        elif char == '√':
            self.expression += "sqrt("
            self.text_input.set(self.expression)
        elif char == '^':
            self.expression += "**"
            self.text_input.set(self.expression)
        elif char == 'exp':
            self.expression += "exp("
            self.text_input.set(self.expression)
        elif char == '圆面积':
            self.calc_circle_area()
        elif char == '圆周长':
            self.calc_circle_circumference()
        elif char == '矩形面积':
            self.calc_rectangle_area()
        elif char == '矩形周长':
            self.calc_rectangle_perimeter()
        else:
            self.expression += str(char)
            self.text_input.set(self.expression)

    def evaluate(self, expr):
        # 安全地计算表达式
        allowed_names = {
            k: v for k, v in math.__dict__.items() if not k.startswith("__")
        }
        allowed_names['sqrt'] = math.sqrt
        allowed_names['log10'] = math.log10
        allowed_names['log'] = math.log
        allowed_names['exp'] = math.exp
        allowed_names['sin'] = math.sin
        allowed_names['cos'] = math.cos
        allowed_names['tan'] = math.tan
        allowed_names['pi'] = math.pi
        allowed_names['e'] = math.e
        allowed_names['abs'] = abs
        allowed_names['pow'] = pow

        # 支持百分号
        expr = expr.replace('%', '/100')
        return eval(expr, {"__builtins__": {}}, allowed_names)

    # 新增几何计算方法
    def calc_circle_area(self):
        r = simpledialog.askfloat("圆面积", "请输入半径 r：")
        if r is not None:
            area = math.pi * r * r
            messagebox.showinfo("结果", f"圆面积 = {area:.6f}")

    def calc_circle_circumference(self):
        r = simpledialog.askfloat("圆周长", "请输入半径 r：")
        if r is not None:
            c = 2 * math.pi * r
            messagebox.showinfo("结果", f"圆周长 = {c:.6f}")

    def calc_rectangle_area(self):
        w = simpledialog.askfloat("矩形面积", "请输入宽度 w：")
        h = simpledialog.askfloat("矩形面积", "请输入高度 h：")
        if w is not None and h is not None:
            area = w * h
            messagebox.showinfo("结果", f"矩形面积 = {area:.6f}")

    def calc_rectangle_perimeter(self):
        w = simpledialog.askfloat("矩形周长", "请输入宽度 w：")
        h = simpledialog.askfloat("矩形周长", "请输入高度 h：")
        if w is not None and h is not None:
            p = 2 * (w + h)
            messagebox.showinfo("结果", f"矩形周长 = {p:.6f}")

if __name__ == "__main__":
    root = tk.Tk()
    calc = ScientificCalculator(root)
    root.mainloop()
