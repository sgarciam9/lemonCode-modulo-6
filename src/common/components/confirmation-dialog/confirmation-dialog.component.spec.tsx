import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {
  it('should render as expected with isOpen true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    // Arrange
    const onCloseMock = vi.fn();
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: onCloseMock,
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    // Arrange
    const onAcceptMock = vi.fn();
    const onCloseMock = vi.fn();
    const props = {
      isOpen: true,
      onAccept: onAcceptMock,
      onClose: onCloseMock,
      title: 'Test Title',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);

    // Assert
    expect(onAcceptMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render with ReactNode as title', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: <h2>Custom Title Component</h2>,
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      children: <div>Test content</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('Custom Title Component')).toBeInTheDocument();
  });

  it('should render with custom button labels', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'Delete Confirmation',
      labels: {
        closeButton: 'No, go back',
        acceptButton: 'Yes, delete it',
      },
      children: <div>Are you sure?</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByText('No, go back')).toBeInTheDocument();
    expect(screen.getByText('Yes, delete it')).toBeInTheDocument();
  });
});
