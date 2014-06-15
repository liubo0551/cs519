surface
stripes( float
		Prob = 0.4,  // probability of seeing orange
		Ks = 0.5,
		Kd = 0.5, 
		Ka = .1, 
		roughness = 0.1;
        color	specularColor = color( 1, 1, 1 )
)
{
	color stripeColor;

	float x = xcomp( P );
	x = x + 0.30 * sin( 1. * ycomp(P) );
	float xfrac = mod( x, 1. );

	if( xfrac < Prob )
		stripeColor = color( 1., .5, 0. );	// beaver orange?
	else
		stripeColor = Cs;

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );
	
	Oi = 1.;
	Ci = Oi * ( stripeColor * ( Ka * ambient() + Kd * diffuse(Nf) ) +
				specularColor * Ks * specular( Nf, V, roughness )  );
}
