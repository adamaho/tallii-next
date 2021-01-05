import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "./Portal";

interface MenuProps {
    isOpen?: boolean;
    onClose: () => void;
}

export const Menu: React.FunctionComponent<MenuProps> = ({
    children,
    isOpen,
    onClose,
}) => {
    // forces a rerender in order to get ref loaded
    const [_, forceRerender] = React.useState<null>();

    // init ref to the menu item to get height
    const menuRef = React.useRef<HTMLDivElement>(null);

    const handleClose = React.useCallback(() => {
        onClose();
    }, [onClose]);

    // disable scrolling when the menu is open
    // NOTE: For now this doesn't work in safari on iOS
    // look at last comment in https://bugs.webkit.org/show_bug.cgi?id=153852
    // for more info
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.removeProperty("overflow");
        }
    }, [isOpen]);

    // force a rerender in order to cause the ref to init
    React.useEffect(() => {
        setTimeout(() => {
            forceRerender(null);
        }, 0);
    }, []);

    return (
        <Portal>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 bg-gray-900 bg-opacity-80 h-full w-full z-0 p-4 pb-12"
                    />
                )}
            </AnimatePresence>
            <motion.div
                ref={menuRef}
                onClick={handleClose}
                variants={{
                    open: {
                        opacity: 1,
                        y: 0,
                    },
                    closed: {
                        opacity: 0,
                        y: menuRef.current ? menuRef.current.offsetHeight : 0,
                    },
                }}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit="closed"
                transition={{ ease: [0.49, 0.08, 0.12, 1.06], duration: 0.2 }}
                className="fixed bottom-0 left-0 w-full z-10 p-4 pb-12"
            >
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    {children}
                </div>
            </motion.div>
        </Portal>
    );
};
