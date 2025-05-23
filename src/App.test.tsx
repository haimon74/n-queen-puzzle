import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('N-Queens Puzzle App', () => {
  it('renders the game title', () => {
    render(<App />);
    const titleElement = screen.getByText('N-Queens Puzzle');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the board size selector', () => {
    render(<App />);
    const labelElement = screen.getByLabelText('Board Size:');
    expect(labelElement).toBeInTheDocument();
    
    // Check if default size (8) is selected
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('8');
  });

  it('renders the timer', () => {
    render(<App />);
    const timerElement = screen.getByText(/Time: 00:00/);
    expect(timerElement).toBeInTheDocument();
  });

  it('renders the game board', () => {
    render(<App />);
    const boardElement = screen.getByRole('grid');
    expect(boardElement).toBeInTheDocument();
    
    // Check if board has correct number of cells (8x8 by default)
    const cells = screen.getAllByRole('gridcell');
    expect(cells).toHaveLength(64);
  });

  it('allows changing board size', () => {
    render(<App />);
    const selectElement = screen.getByRole('combobox');
    
    // Change to 4x4 board
    fireEvent.change(selectElement, { target: { value: '4' } });
    
    // Check if board updates
    const cells = screen.getAllByRole('gridcell');
    expect(cells).toHaveLength(16);
  });

  it('allows placing and removing queens', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    
    // Place a queen
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('♛');
    
    // Remove the queen
    fireEvent.click(cells[0]);
    expect(cells[0]).not.toHaveTextContent('♛');
  });

  it('shows success message when puzzle is solved', () => {
    render(<App />);
    
    // Place queens in a valid 4x4 solution
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '4' } });
    
    const cells = screen.getAllByRole('gridcell');
    // Place queens in a valid 4x4 solution
    fireEvent.click(cells[1]);  // (0,1)
    fireEvent.click(cells[7]);  // (1,3)
    fireEvent.click(cells[8]);  // (2,0)
    fireEvent.click(cells[14]); // (3,2)
    
    const successMessage = screen.getByText(/Congratulations! You solved the 4-Queens puzzle!/);
    expect(successMessage).toBeInTheDocument();
  });
});
