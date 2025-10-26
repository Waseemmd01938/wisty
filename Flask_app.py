from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import tempfile
import os

app = Flask(__name__)
CORS(app)

def executing_code(script_code, language):
    value = {"value": "", "error": ""}
    Language = {
        'python': '.py',
        'javascript': '.js',
        'typescript': '.ts'
    }

    suffix = Language.get(language)
    if not suffix:
        value["error"] = f"Unsupported language: {language}"
        return value

    temp_script = tempfile.NamedTemporaryFile(mode='w+', suffix=suffix, delete=False)
    try:
        temp_script.write(script_code)
        temp_script.close()  # <<< Close file before running subprocess

        process_name = 'python' if language == 'python' else 'node'

        process = subprocess.Popen(
            [process_name, temp_script.name],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        stdout, stderr = process.communicate()

        value["value"] = stdout.strip()
        value["error"] = stderr.strip()

    except Exception as e:
        value["error"] = str(e)
    finally:
        try:
            os.remove(temp_script.name)
        except Exception:
            pass  # Ignore if deletion fails (Windows sometimes lags here)

    return value

@app.route("/wisty/execute", methods=["POST"])
def execute_data():
    try:
        data = request.get_json()
        if not data or 'code' not in data or 'language' not in data:
            return jsonify({"status": "error", "error": "Missing 'code' or 'language' in request"}), 400

        result = executing_code(data['code'], data['language'])
        return jsonify({
            "status": "success" if not result['error'] else "error",
            "output": result['value'],
            "error": result['error']
        }), 201

    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
