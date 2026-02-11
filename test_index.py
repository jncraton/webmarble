from playwright.sync_api import Page, expect
import pytest
from pathlib import Path

file_url = Path("index.html").resolve().as_uri()

@pytest.fixture
def root(page: Page):
    page.goto(file_url)
    page.wait_for_function('window.game !== undefined')
    return page

def test_page_title(root: Page):
    expect(root).to_have_title("Marble Run Sandbox")

def test_palette_exists(root: Page):
    expect(root.locator("#palette")).to_be_visible()
    expect(root.locator(".tool")).to_have_count(3)

def test_placement_and_movement(root: Page):
    # Select line tool and draw a ramp
    root.click('button[data-tool="line"]')
    root.mouse.move(300, 300)
    root.mouse.down()
    root.mouse.move(500, 400)
    root.mouse.up()
    
    # Check body count (ground + line + mouseConstraint)
    initial_bodies = root.evaluate('window.game.Composite.allBodies(window.game.world).length')
    
    # Select marble tool and drop it above the line
    root.click('button[data-tool="marble"]')
    root.mouse.click(400, 100)
    
    # Verify body count increased
    new_bodies = root.evaluate('window.game.Composite.allBodies(window.game.world).length')
    assert new_bodies == initial_bodies + 1
    
    # Get initial marble position
    # The marble is the last body added
    initial_y = root.evaluate('window.game.Composite.allBodies(window.game.world).at(-1).position.y')
    assert 90 <= initial_y <= 110
    
    # Wait for physics to simulate
    root.wait_for_timeout(1000)
    
    # Verify marble has fallen
    final_y = root.evaluate('window.game.Composite.allBodies(window.game.world).at(-1).position.y')
    assert final_y > initial_y
