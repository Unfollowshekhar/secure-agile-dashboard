# test_import.py
try:
    from app import create_app
    print("✓ Successfully imported create_app from app")
except ImportError as e:
    print(f"✗ Import failed: {e}")