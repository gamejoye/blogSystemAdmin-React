import Home from "../../pages/Home"
import { Suspense } from "react"
import { Route, Routes } from "react-router"
import { CREATION, TALKS } from "../../contants/routeName"
import './index.scss'
import Talks from "../../pages/Talks"
import Creation from "../../pages/Creation"
const Main = () => {
    return (
        <main className="main">
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={TALKS} element={<Talks />} />
                    <Route path={CREATION} element={<Creation />} />
                </Routes>
            </Suspense>
        </main>
    )
}

export default Main;