from flask import Blueprint, render_template

from ..services.networks_service import NetworkService

network_blueprint = Blueprint('networks', __name__, template_folder='../templates')


@network_blueprint.get('/')
def index_page():
    networks = NetworkService.get_all_networks()
    return render_template('index.html', networks=networks)
