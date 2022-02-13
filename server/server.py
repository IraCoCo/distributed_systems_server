from flask import Flask

from .blueprints.api_network_blueprint import api_network_blueprint
from .blueprints.network_blueprint import network_blueprint

app = Flask(__name__)
app.register_blueprint(api_network_blueprint)
app.register_blueprint(network_blueprint)
