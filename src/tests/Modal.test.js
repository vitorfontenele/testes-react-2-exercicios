import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal";

const activeModalMock  = {
    id: 1,
    name: "name",
    types: [
        {
            type: {
                name: "type-a"
            }
        },
        {
            type: {
                name: "type-b"
            }
        }
    ],
    sprites: {
        front_default: "https://www.url.com"
    },
    weight: 692,
    height: 17
}

const closeModalMock = jest.fn();

describe("Modal", () => {
    test("Renderização", () => {
        render(<Modal 
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)
        
        const id = screen.getByRole('heading', { name: /#1 name/i });
        const title = screen.getByText(/name/i);
        const image = screen.getByRole("img", {name: /name/i});
        const typeA = screen.getByText(/type\-a/i);
        const typeB = screen.getByText(/type\-b/i);
        const weight = screen.getByText(/69\.2 kg/i)
        const height = screen.getByText(/1\.7 m/i);
        const button = screen.getByRole("button", {name: /❌/i});
        
        expect(id).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(typeA).toBeInTheDocument();
        expect(typeB).toBeInTheDocument();
        expect(weight).toBeInTheDocument();
        expect(height).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    test("Função de fechar modal", async () => {
        render(<Modal 
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)

        const button = screen.getByRole("button", {name: /❌/i});

        const user = userEvent.setup();
        await user.click(button);

        expect(closeModalMock).toHaveBeenCalled();
    })
})