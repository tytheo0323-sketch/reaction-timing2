from flask import Flask, render_template, request
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="tomato",      # tomato로 변경!
    static_url_path="/tomato"    # /tomato로 변경!
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    tries = request.args.get("tries", "5")
    if tries not in {"5", "7", "10", "15", "20"}:
        tries = "5"
    return render_template("omija.html", tries=int(tries))   # omija.html로 변경!

@app.route("/health")
def health():
    return "ok", 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
