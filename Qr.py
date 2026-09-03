import qrcode 

data = "https://pranavui3.github.io/attendance-system/Student_login.html"

qr = qrcode.make(data)

qr . save("attendance_qr.png")

print("QR code generated !")