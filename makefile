all: deploy

lint:
	npx prettier@3.6.2 --check .
	
format:
	npx prettier@3.6.2 --write .

matter.min.js:
	wget -O matter.min.js https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js

test:
	uv run --with pytest-playwright==0.7.2 python -m playwright install chromium firefox
	uv run --with pytest-playwright==0.7.2 python -m pytest --browser chromium --browser firefox

deploy: matter.min.js

clean:
	rm -rf .pytest_cache __pycache__ matter.min.js
