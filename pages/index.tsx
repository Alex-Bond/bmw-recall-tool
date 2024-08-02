import type { NextPage } from 'next'
import React from 'react'
import { MainLayout } from '../components/layouts/main.layout'

const Home: NextPage = () => (
  <MainLayout>
    {/*<VinForm />*/}
    <h1>End of life</h1>
    <p>Hi everyone!</p>
    <p>Unfortunately, BMW hates sharing detailed information with us about our cars. On August 1st, 2024 they pushed a
      new update to
      the <a href='https://vehiclerecall.bmwgroup.com/index.html?brand=bmw&market=uk&language=en' target='_blank'>BMW
        tool</a> with hCaptcha there.
      I theoretically can write a script to bypass it, but it will cross the line for me of the legality of this tool.
    </p>
    <p>As a result of this update, the BMW tool is no longer functional for us.</p>
    <p>You still can check recall codes using this
      tutorial
      - <a href='https://g80.bimmerpost.com/forums/showthread.php?t=1865007&highlight=vehiclerecall.bmwgroup.com'
           target='_blank'>link</a>
    </p>
    <p>As for this tool's future - I may add here the list of codes we collected over time (you can check
      them <a href='https://github.com/Alex-Bond/bmw-recall-tool/blob/main/constants/defect-code-info.ts'
              target='_blank'>here</a>) some day in the future, but for now I will leave it as is.</p>
    <p>I want to thank all the contributors who helped collect the codes, especially @itsanalogue, for making the tool a
      bit more useful with code prefixes.</p>
    <br />
    <p>Alex.</p>
    <br /> <br />
    <p>P.S. BMW corporate, you can still reach out to me if you are remotely interested in being more transparent to
      your cars owners. My email is still the same - me@alexbond.info.</p>
  </MainLayout>
)

export default Home
