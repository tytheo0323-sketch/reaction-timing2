from flask import Flask, render_template, request

app = Flask(__name__, static_folder="토마토", static_url_path="/토마토")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/test")
def test():
    tries = request.args.get("tries", "5")
    if tries not in {"5", "7", "10", "15", "20"}:
        tries = "5"
    return render_template("오미자.html", tries=int(tries))

if __name__ == "__main__":
    app.run(debug=True)
