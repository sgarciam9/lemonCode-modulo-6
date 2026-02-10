import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from '#common/models';

describe('common/components/confirmation-dialog/useConfirmationDialog', () => {
  it('should initialize with default values', () => {
    // Arrange & Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open dialog and set item to delete when onOpenDialog is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(testItem);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('should close dialog when onClose is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('should reset itemToDelete to empty lookup when onAccept is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
    expect(result.current.isOpen).toBe(true);
  });

  it('should handle multiple open/close cycles', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem1 = { id: 'test-id-1', name: 'Test Item 1' };
    const testItem2 = { id: 'test-id-2', name: 'Test Item 2' };

    // Act & Assert - First cycle
    act(() => {
      result.current.onOpenDialog(testItem1);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem1);

    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);

    // Act & Assert - Second cycle
    act(() => {
      result.current.onOpenDialog(testItem2);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem2);
  });

  it('should handle accept then close workflow', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const testItem = { id: 'test-id', name: 'Test Item' };

    // Act
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onAccept();
    });
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
