surface
labone( float
		Ad = 0.1,
		Bd = 0.4, // dot diameter
		Ks = 0.5,
		Kd = 0.5, 
		Ka = .1, 
		roughness = 0.1;
        color	specularColor = color( 1, 1, 1 )
)
{
	float up =  2 * xcomp(P);
	float vp =  ycomp(P);

	float numinu = floor( up / (2.0*Ad) );
	float numinv = floor( vp / (2.0*Bd) );

	color dotColor = Cs;
	if( mod( numinu+numinv, 2 ) == 0 )
	{
		float uc = numinu*Ad + Ad/2.;
		float vc = numinv*Bd + Bd/2.;
		up = up - uc;
		vp = vp - vc;
//		point upvp =  point( up, vp, 0. );
//		point cntr =  point( 0., 0., 0. );
		//if( distance( upvp, cntr ) < Diam/2. )
		if((((up - uc)/Ad)*((up - uc)/Ad) + ((vp - vc)/Bd)*((vp - vc)/Bd))<1.0)
		{
			dotColor = color( 1., .5, 0. );      // beaver orange?
		}
	}

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );
	
	Oi = 1.;
	Ci = Oi * ( dotColor * ( Ka * ambient() + Kd * diffuse(Nf) ) +
				specularColor * Ks * specular( Nf, V, roughness )  );
}
