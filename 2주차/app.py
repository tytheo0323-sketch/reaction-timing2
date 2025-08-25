# app.py
from flask import Flask, render_template, request
import os

# templates 폴더: Jinja 템플릿(index.html, 오미자.html)
# 정적 폴더: '토마토' (css/js/이미지) -> /토마토/경로로 접근
app = Flask(
    __name__,
    template_folder="templates",
    static_folder="토마토",
    static_url_path="/토마토",
)

@app.route("/")
def home():
    # 예: templates/index.html
    return render_template("index.html")

@app.route("/test")
def test():
    # /test?tries=10 처럼 호출
    tries = request.args.get("tries", "5")
    if tries not in {"5", "7", "10", "15", "20"}:
        tries = "5"
    return render_template("오미자.html", tries=int(tries))

# 헬스체크(옵션): 배포 상태 확인용
@app.route("/health")
def health():
    return "ok", 200

if __name__ == "__main__":
    # Railway가 제공하는 PORT 사용 (없으면 8080)
    port = int(os.environ.get("PORT", 8080))
    # 외부 접속을 위해 host='0.0.0.0'
    app.run(host="0.0.0.0", port=port)
