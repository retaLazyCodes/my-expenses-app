import json

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import bd_dao

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/v1/transactions/initial', methods=['GET'])
@cross_origin()
def get_transactions():
    all_transactions = bd_dao.get_all_transactions()
    print("all", all_transactions)
    print(jsonify(all_transactions))
    return json.dumps(all_transactions)


@app.route('/api/v1/transactions/save', methods=['POST'])
@cross_origin()
def save_transactions():
    transaction_form = request.form
    print(transaction_form)
    bd_dao.insert_transaction(transaction_form)
    response = {'message': 'transaction saved success'}
    return json.dumps(response)


@app.route('/api/v1/transactions/delete/<id>', methods=['DELETE'])
@cross_origin()
def delete_transactions(id):
    bd_dao.delete_transaction(id)
    response = {'message': 'transaction deleted success'}
    return jsonify(response)


app.run(debug=True, port=3050)

