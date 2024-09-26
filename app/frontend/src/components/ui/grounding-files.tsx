import { AnimatePresence, motion, Variants } from "framer-motion";

import { GroundingFile as GroundingFileType } from "@/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import GroundingFile from "./grounding-file";

type Properties = {
    files: GroundingFileType[];
    onSelected: (file: GroundingFileType) => void;
};

const variants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    })
};

export function GroundingFiles({ files, onSelected }: Properties) {
    if (files.length === 0) {
        return null;
    }

    return (
        <Card className="m-4 max-w-full md:max-w-md">
            <CardHeader>
                <CardTitle className="text-xl">Grounding files</CardTitle>
                <CardDescription>Files used to ground the last answer.</CardDescription>
            </CardHeader>
            <CardContent>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full overflow-y-auto"
                    >
                        <div className="flex flex-wrap gap-2">
                            {files.map((file, index) => (
                                <motion.div key={index} variants={variants} initial="hidden" animate="visible" custom={index}>
                                    <GroundingFile key={index} value={file} onClick={() => onSelected(file)} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
