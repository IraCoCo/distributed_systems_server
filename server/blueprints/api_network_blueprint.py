from flask import Blueprint, jsonify
from flask_cors import CORS
from ..services.networks_service import NetworkService

api_network_blueprint = Blueprint('api_networks', __name__, url_prefix='/api/networks')
CORS(api_network_blueprint)


@api_network_blueprint.get('')
def api_get_neural_networks():
    networks = NetworkService.get_all_networks()
    return jsonify([network.__dict__ for network in networks])


"""@api_message_blueprint.post('/yolo')
def api_post_yolo():
    try:
        yolo = request.json
        yolo_res = NetworkService.post_yolo(yolo)
        return jsonify(yolo_res.__dict__), 201
    except NetworkNotWorkError as e:
        return jsonify({
            'statusCode': 422,
            'error': str(e)
        }), 422


@api_message_blueprint.post('/nn_pipelines')
def api_post_nn_pipelines():
    try:
        nn_pipelines = request.json
        result = NetworkService.post_nn_pipelines(nn_pipelines)
        return jsonify(result.__dict__), 201
    except NetworkNotWorkError as e:
        return jsonify({
            'statusCode': 422,
            'error': str(e)
        }), 422
"""
