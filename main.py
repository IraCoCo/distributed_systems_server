import sys
from server.server import app


if __name__ == '__main__':
    app.env = 'development'
    app.run(port=int(sys.argv[1]), debug=True)
