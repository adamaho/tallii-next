import React from "react";

import { AnimatePresence, motion } from "framer-motion";

interface ValidationProps {
    errors?: any;
}

export const Validation: React.FunctionComponent<ValidationProps> = ({
     errors,
     children
 }) => {
    return (
        <div className="mb-4">
            {children}
            <AnimatePresence initial={false}>
                {errors && (
                    <motion.div
                        key={errors}
                        initial={{
                            opacity: 0,
                            y: -10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{ duration: 0.15 }}
                    >
                        <p className="bg-yellow-400 bg-opacity-20 text-yellow-400 text-xs rounded-md mt-2 py-1 px-2 overflow-ellipsis overflow-hidden">
                            {errors}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};