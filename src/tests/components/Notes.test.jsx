import { render } from '@testing-library/react';
import Note from '../../components/Note';

describe('Notes component', () => {
    it('check for input', () => {
        const { container } = render(<Note />);
        const input = container.querySelector('.input');

        expect(input).toBeInTheDocument();
    });

    it('check for button', () => {
        const { container } = render(<Note isEdit={true} />);
        const btn = container.querySelector('.delete-note-btn');

        expect(btn).toBeInTheDocument();
    });

    it('check for textarea', () => {
        const { container } = render(<Note />);
        const textarea = container.querySelector('.textarea');

        expect(textarea).toBeInTheDocument();
    });
})
