from playwright.sync_api import Page, expect
import pytest
from pathlib import Path

file_url = Path("index.html").resolve().as_uri()

@pytest.fixture
def root(page: Page):
    page.goto(file_url)
    return page

def test_page_title(root: Page):
    expect(root).to_have_title("Marble Run Sandbox")

def test_palette_exists(root: Page):
    expect(root.locator("#palette")).to_be_visible()
    expect(root.locator(".tool")).to_have_count(4)
